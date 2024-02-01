import colors from "colors";

const log = (message: string, type?: string) => {
   switch (type) {
       case "info":
              console.log(colors.blue("[INFO] " + message));
              break;
       case "error":
                console.log(colors.red("[ERROR] " + message));
                break;
       case "warn":
                console.log(colors.yellow("[WARN] " + message));
                break;
       default:
              console.log(colors.gray("[UNK] " + message));
              break;
   }
}

export default log;