import { constanteRandom } from "./modulo"

chrome.action.onClicked.addListener(() => console.log('clicked',constanteRandom))