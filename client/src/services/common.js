import { encode } from "base-64";
import utf8 from "utf8";

const info = {
  token: encode(utf8.encode(encode(`Bearer ${process.env.REACT_APP_API_KEY}`))),
  proxy: "https://anupreet9.github.io/Blog/client/build/index.html#/"
}

export default info;