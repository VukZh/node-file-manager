import {userInfo} from "os";

const userName = () => userInfo().username;
export default userName;
