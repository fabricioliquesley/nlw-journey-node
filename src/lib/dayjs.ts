import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale(ptBr);
dayjs.extend(localizedFormat);

export { dayjs };
