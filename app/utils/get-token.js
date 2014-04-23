export default function token() {
  return JSON.parse(localStorage['authToken']).authToken;
}
