
import { HarpokratApi, IResource, IToken, IPassword, ISecret, IHclSecret, IResourceIdentifier } from '@harpokrat/client';

const ctx: Worker = self as any;

const wasmUrl = 'https://static.harpokrat.com/hcl/hcl4.wasm';
const apiUrl = 'https://api.harpokrat.com/v1/';

var client = new HarpokratApi({
    auth: {
        email: '',
        password: ''
    },
    apiUrl: apiUrl,
    hclWasmUrl: wasmUrl,
    requester: undefined,
});
client.hcl.init();

var current_token: IResource<IToken>;


const login = async (email: string, password: string) => {
    client.auth = { email, password };
    current_token = await client.jsonWebTokens.create();
    client.accessToken = current_token.attributes.token;
    ctx.postMessage({ message: "debug", token: current_token.attributes.token });
    ctx.postMessage({ message: "login-response", token: current_token })
}

const getAllUserPasswords = async () => {
    var current_user_id = (current_token.relationships.user.data as IResourceIdentifier).id;

    var passwords = [];

    var hclModule = await client.hcl.getModule();
    var vaults = await client.users.resource(current_user_id, 'vaults').readMany({
        page: 1,
        size: 100,
    })
    // ctx.postMessage({ message: "debug", vaults });
    for (const vault of vaults) {
        var secrets = await client.vaults.resource(vault.id, 'secrets').readMany({
            page: 1,
            size: 200,
        })
        // ctx.postMessage({ message: "debug", secrets });
        for (const secret of secrets) {
            try {
                var aled: IHclSecret = hclModule.Secret.Deserialize("", secret.attributes.content);
                var password = hclModule.CastSecretToPassword(aled);
                // ctx.postMessage({
                //     message: "debug",
                //     secrettypename: password.GetSecretTypeName(),
                //     name: password.GetName(),
                //     domain: password.GetDomain(),
                //     username: password.GetLogin(),
                //     password: password.GetPassword(),
                // });
                passwords.push({
                    secret: secret,
                    name: password.GetName(),
                    domain: password.GetDomain(),
                    username: password.GetLogin(),
                    password: password.GetPassword(),
                })
            } catch (e) {
                ctx.postMessage({ message: "debug-error", err: e.message, stack: e.stack });
            }
        }
    }
    ctx.postMessage({ message: "getAllUserPasswords-response", passwords });
}

const addPassword = async (account: any) => {
    var current_user_id = (current_token.relationships.user.data as IResourceIdentifier).id;

    var hclModule = await client.hcl.getModule();
    var vaults = await client.users.resource(current_user_id, 'vaults').readMany({
        page: 1,
        size: 100,
    })

    if (vaults.length != 0) {
        let vault = vaults[0];

        var secrets_resource = client.vaults.resource(vault.id, 'secrets');
        let s = new hclModule.Password();
        s.InitializePlainCipher();
        s.SetName(account.name);
        s.SetDomain(account.domain);
        s.SetLogin(account.username);
        s.SetPassword(account.password);
        const serialized = s.Serialize('');

        try {
            let aled = await client.secrets.create({
                attributes: {

                    content: serialized,
                    private: true,
                },
                type: 'secrets',
                relationships: { owner: { data: vault } }
            })
        } catch (e) {
            ctx.postMessage({ message: "debug-error", err: e.message, stack: e.stack });
        }
    }
    ctx.postMessage({ message: "addPassword-response", success: true });
}

const modifyPassword = async (account: any) => {
    var current_user_id = (current_token.relationships.user.data as IResourceIdentifier).id;

    var hclModule = await client.hcl.getModule();
    var vaults = await client.users.resource(current_user_id, 'vaults').readMany({
        page: 1,
        size: 100,
    })

    if (vaults.length != 0) {
        let vault = vaults[0];

        var secrets_resource = client.vaults.resource(vault.id, 'secrets');
        let s = new hclModule.Password();
        s.InitializePlainCipher();
        s.SetName(account.name);
        s.SetDomain(account.domain);
        s.SetLogin(account.username);
        s.SetPassword(account.password);
        const serialized = s.Serialize('');

        try {
            ctx.postMessage({ message: "debug", aled: "ALED OSKOUR" });
            let aled = await client.secrets.update(account.secret.id, {
                ...account.secret,
                attributes: {
                    content: serialized,
                },
                relationships: undefined,
            })
        } catch (e) {
            ctx.postMessage({ message: "debug-error", err: e.message, stack: e.stack });
        }
    }
    ctx.postMessage({ message: "modifyPassword-response", success: true });
}

ctx.onmessage = async (ev: MessageEvent) => {
    // ctx.postMessage({ message: "debug", aled: "HELLO FROM WEBWORKER" });
    try {
        if (ev.data.message == "login") {
            await login(ev.data.params.email, ev.data.params.password);
        }
        if (ev.data.message == "getAllUserPasswords") {
            await getAllUserPasswords();
        }
        if (ev.data.message == "addPassword") {
            await addPassword(ev.data.params);
        }
        if (ev.data.message == "modifyPassword") {
            await modifyPassword(ev.data.params);
        }
    } catch (e) {
        ctx.postMessage({
            message: "workerException", err: e.message, stack: e.stack
        })
    }
}