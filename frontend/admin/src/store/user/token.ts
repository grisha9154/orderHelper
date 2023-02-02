import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import moment from "moment";

interface TokenData {
  user: string;
  exp: number;
  id: number;
}

export class Token {
  static set(value: string) {
    const { exp } = this.parse(value);
    Cookies.set("token", value, { expires: moment.unix(exp).toDate() });
  }

  static get() {
    return Cookies.get("token");
  }

  static remove() {
    Cookies.remove("token");
  }

  static parse(value: string): TokenData {
    return jwtDecode(value);
  }
}
