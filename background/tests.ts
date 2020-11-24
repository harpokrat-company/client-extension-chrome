
import { storage_tests } from './storage'
import { pending_accounts_tests } from './pending_accounts'

export const run_tests = async () => {
  console.log("=================================================")
  console.log("STARTING TESTS")
  console.log("=================================================")
  await storage_tests()
  console.log("ran local storage tests successfuly")
  console.log("=================================================")
  await pending_accounts_tests()
  console.log("ran pending accounts tests successfuly")
  console.log("=================================================")
}

