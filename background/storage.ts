
// Takes a list from the extension's local storage, adds an element to it
export const push_storage_list = async (key: any, elem: any) => {
  let res = await browser.storage.local.get([key]);
  (res[key] as any).push(elem);
  return browser.storage.local.set({ [key]: res[key] });
}


export const get_from_storage_list = async (key: any, filter: any) => {
  let res = await browser.storage.local.get([key])
  return (res[key] as any).find((x: any) => {
    for (const [i, j] of Object.entries(filter)) {
      if (x[i] !== j) {
        return false;
      }
    }
    return true;
  })
}

// Takes a list from the extension's local storage, removes an element,
// found using .indexOf(filter)
export const splice_storage_list = async (key: any, filter: any) => {
  let res = await browser.storage.local.get([key]);
  (res[key] as any).splice((res[key] as any).indexOf(filter), 1);
  return browser.storage.local.set({ [key]: res[key] });
}

/* =====================================
                TESTS
===================================== */

export const storage_tests = async () => {
  let res = await browser.storage.local.get(['aled'])
  console.log(JSON.stringify(res))
  let i = (res['aled'] as any).length;
  await push_storage_list('aled', { aled: "oskour" })
  res = await browser.storage.local.get(['aled'])
  console.log(JSON.stringify(res))
  if ((res['aled'] as any).length != i + 1) {
    throw new Error("did not add 1 element to storage list")
  }
  await splice_storage_list('aled', { aled: "oskour" })
  res = await browser.storage.local.get(['aled'])
  console.log(JSON.stringify(res))
  if ((res['aled'] as any).length != i) {
    throw new Error("did not splice 1 element from storage list")
  }
}
