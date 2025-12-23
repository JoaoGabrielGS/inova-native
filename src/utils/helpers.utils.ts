class HelpersUtils {
  public static removeTags(str: string | null): string | false {
    if (str === null || str === "") return false;
    else str = str?.toString();
    return str?.replace(/(<([^>]+)>)/gi, "");
  }

  public static removeSpaces(s: string) {
    return s.replace(/\s/g, "");
  }

  public static slugify(input: string): string {
    const noWhitespace = input.toLowerCase().replace(/ /g, "-");
    const noAccents = noWhitespace
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return noAccents.replace(/[^a-z0-9-]/g, "");
  }

  public static pluralize = (
    val: number | Record<string, string>,
    word: string,
    plural = word + "s",
  ) => {
    const _pluralize = (num: number, word: string, plural = word + "s") =>
      [1, -1].includes(Number(num)) ? word : plural;
    if (typeof val === "object")
      return (num: number, word: string) => _pluralize(num, word, val[word]);
    return _pluralize(val, word, plural);
  };

  public static concatToFullname = (firstName: string, lastName: string) => {
    return lastName && firstName !== lastName
      ? firstName + " " + lastName
      : firstName;
  };

  public static verifyAndSplitFullname = (fullname: string) => {
    const names = fullname.trim().split(/\s+/);
    return names.length < 2
      ? false
      : { firstName: names[0], lastName: names.slice(1).join(" ") };
  };

  public static secondsToHms = (d: any) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " horas, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutos, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " second" : " segundos") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  public static hoursToMinutes = (h: number) => {
    if (!h) return 0;
    return h * 60;
  };

  public static formatWorkload = (workload: number, unit = "hours") => {
    if (unit === "minutes") return Math.ceil(workload / 60);
    return workload;
  };

  public static formatToHourString(value: number): string {
    const hours = Math.floor(value);
    const minutes = Math.floor((value % 1) * 60);
    const paddedMinutes = String(minutes).padStart(2, "0");
    return `${hours}:${paddedMinutes} hs`;
  }

  public static calculateDiscount = (discount: number, listPrice: string) => {
    const beforeDiscount = parseFloat(parseFloat(listPrice).toFixed(2));
    const discountAmount = parseFloat(
      ((beforeDiscount * discount) / 100).toFixed(2),
    );
    const afterDiscount = beforeDiscount - discountAmount;
    return afterDiscount.toFixed(2);
  };

  public static formatCurrency = (value?: number) => {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);
  };

  public static formatCurrencyText = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const raw = e.target.value.replace(/\D/g, "");

    const cents = raw === "" ? "0" : raw.replace(/^0+/, "") || "0";

    const valueInCents = parseInt(cents, 10);

    return valueInCents / 100;
  };

  public static formatToAPIDecimal(value: number | string) {
    const strValue = value.toString().replace(",", ".");

    if (!strValue.includes(".")) {
      return strValue + ".00";
    }

    const [whole, decimal] = strValue.split(".");

    if (!decimal || decimal.length < 2) {
      return `${whole}.${(decimal || "").padEnd(2, "0")}`;
    }

    return strValue;
  }

  public static toLocalISOString = (date: Date) => {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, -1);
  };

  public static formatDateTime = (date?: Date | string) => {
    if (!date || String(date) === "Invalid Date" || date === "") return "";
    const data = new Date(date).toISOString()?.split("T")[0];
    const horas = new Date(date).toISOString()?.split("T")[1];
    const dia = data.split("-")[2];
    const mes = data.split("-")[1];
    const ano = data.split("-")[0];
    const horasFormatadas = horas.split(":")[0] + ":" + horas.split(":")[1];
    return `${dia}/${mes}/${ano} às ${horasFormatadas}`;
  };

  public static formatDateOutput = (date?: Date | string) => {
    if (!date || String(date) === "Invalid Date") return "";
    const data = new Date(date).toISOString().split("T")[0];
    const dia = data.split("-")[2];
    const mes = data.split("-")[1];
    const ano = data.split("-")[0];
    return `${dia}/${mes}/${ano}`;
  };

  public static formatTime = (date?: Date | string | number): string => {
    if (!date || String(date) === "Invalid Date" || date === "") return "";
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "";
    const hours = String(parsedDate.getHours()).padStart(2, "0");
    const minutes = String(parsedDate.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  public static formatDurationHHMM = (
    durationInMinutes?: number | null,
  ): string => {
    if (
      durationInMinutes === undefined ||
      durationInMinutes === null ||
      durationInMinutes < 0
    ) {
      return "00:00";
    }
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  };

  public static formatDateYMD = (date?: Date | string) => {
    if (!date || String(date) === "Invalid Date") return "";

    const data = new Date(date).toISOString().split("T")[0];
    const [ano, mes, dia] = data.split("-");

    return `${ano}-${mes}-${dia}`;
  };

  public static formatReferenceMonth = (isoDate: Date | string) => {
    if (!isoDate || String(isoDate) === "Invalid Date") return null;
    const date = new Date(isoDate).toISOString();
    const month = date.split("-")[1];
    const year = date.split("-")[0];
    return `${month}/${year}`;
  };

  public static toLocaleISOString = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60000;
    const localTime = new Date(date.getTime() - offset);
    return localTime.toISOString().slice(0, -1);
  };

  public static formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  public static batchStatusColor = (status: string) => {
    if (["Repasse Concluído"].includes(status)) return "bg-brand-green";
    if (["Pagamento Realizado", "Repasse Em Análise"].includes(status))
      return "bg-brand-yellow-400 text-black";
    if (["NFE Em Análise"].includes(status)) return "bg-primary";
    if (
      ["NFE Reprovada", "Pagamento Contestado", "Repasse Contestado"].includes(
        status,
      )
    )
      return "bg-destructive";
    if (["NFE Pendente"].includes(status)) return "bg-brand-yellow";
    return "bg-brand-amber-200 text-black";
  };

  public static instructorBatchStatusColor = (status: string) => {
    if (["Repasse Concluído"].includes(status)) return "bg-brand-green";
    if (["Pagamento Realizado", "Repasse Em Análise"].includes(status))
      return "bg-brand-yellow-400 text-black";
    if (["NFE Reprovada"].includes(status)) return "bg-destructive";
    if (["NFE Pendente"].includes(status)) return "bg-brand-yellow";
    return "bg-brand-gray-medium-dark";
  };

  public static formatToLocalDateTime = (date: Date | null): string | null => {
    if (!date) return null;
    return date.toISOString().split("T")[0] + "T00:00:00";
  };

  public static capitalizeFirstLetter = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  public static capitalizeAllFirstLetter = (value: string): string => {
    return value
      .toLowerCase()
      .replace(/-/g, " - ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace(/(\s-\s)/g, "-");
  };

  public static validateYouTubeLink(inputText: string) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (youtubeRegex.test(inputText)) {
      return true;
    } else {
      return false;
    }
  }

  public static validateVimeoLink(inputText: string) {
    if (inputText.includes("player.vimeo.com")) {
      inputText = inputText.replace("player.vimeo.com/video", "vimeo.com/");
    }

    const vimeoRegex = /^https?:\/\/(www\.)?vimeo\.com\/(\d+)(?:\?.*)?$/;
    if (vimeoRegex.test(inputText)) {
      return true;
    } else {
      return false;
    }
  }

  public static validateCPF(cpf: string) {
    if (!cpf) return false;

    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    const invalidCPFs = [
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
    ];
    if (invalidCPFs.includes(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  public static formatCpf(cpf: string) {
    if (!cpf) return "";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  }

  public static formatCnpj(cnpj: string) {
    if (!cnpj) return "";
    return cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      "$1.$2.$3/$4-$5",
    );
  }

  public static removeMask(value: string) {
    return value?.replace(/\D/g, "") || "";
  }

  public static formatCep(cep: string) {
    if (!cep) return "";
    return cep.replace(/(\d{5})(\d{3})/g, "$1-$2");
  }

  public static formatMoney = (value: number) => {
    const options: Intl.NumberFormatOptions = {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    };
    const formatNumber = new Intl.NumberFormat("pt-BR", options);

    return formatNumber.format(value);
  };

  public static generatePixExpirationMessage(expirationDate: string): string {
    const date = new Date(expirationDate);

    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const ano = date.getFullYear();
    const hora = date.getHours().toString().padStart(2, "0");
    const minuto = date.getMinutes().toString().padStart(2, "0");
    const segundo = date.getSeconds().toString().padStart(2, "0");

    return `Código PIX válido até: ${dia}/${mes}/${ano}, ${hora}:${minuto}:${segundo} (Horário de Brasília)`;
  }

  public static formatDuration(durationInMinutes: number): string {
    if (!Number.isFinite(durationInMinutes) || durationInMinutes < 0) {
      return "00:00";
    }

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  public static translatePaymentMethod(paymentMethod: string): string {
    switch (paymentMethod) {
      case "CREDIT_CARD":
        return "Cartão de crédito";
      case "PIX":
        return "Pix";
      case "FREE":
        return "Grátis";
      default:
        return "Desconhecido";
    }
  }

  public static paymentMethodSearch(paymentMethod: string): string {
    const englishTerm = paymentMethod.toLowerCase().trim();

    if (
      englishTerm.includes("cartão de crédito") ||
      englishTerm.includes("cart") ||
      englishTerm.includes("crédito")
    ) {
      return "CREDIT_CARD";
    }

    if (englishTerm === "pix") {
      return "PIX";
    }

    if (englishTerm.includes("gr")) {
      return "FREE";
    }

    return paymentMethod.toUpperCase();
  }

  public static formatRg(rg: string): string {
    if (!rg) return "";
    return rg.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
  }

  public static formatISODateTime = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toISOString().split(".")[0];
  };

  public static formatPermissions = (permissions: string) => {
    switch (permissions) {
      case "IS_ADMIN":
        return "Administrador";
      case "IS_INSTRUCTOR":
        return "Instrutor";
      case "IS_TUTOR":
        return "Tutor";
      case "IS_POST_GRADUATION_CREATOR":
        return "Instrutor criador de pós graduação";
      case "IS_MANAGER":
        return "Gestor de Empresa";
      default:
        return "Aluno";
    }
  };

  public static blobToPDF(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorio.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public static blobToXLSX(blob: Blob, title = "relatorio") {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title + ".xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Return an youtube url inputed to a url in format "https://www.youtube.com/watch?v=[VIDEO_ID]" by default
  public static formatYouTubeUrl = (value: string) => {
    if (value.includes("/embed/")) {
      value = value?.replace("/embed/", "/watch?v=");
    }
    if (value.includes("youtu.be/")) {
      value = value?.replace("youtu.be/", "youtube.com/watch?v=");
    }

    if (value.includes("&v=")) {
      value = value?.replace(/.*&v=/, "https://www.youtube.com/watch?v=");
    }

    value = value?.replace(/\?si=.*/g, "");
    value = value?.replace(/&.*/g, "");

    return value;
  };

  public static formatVimeoUrl = (value: string) => {
    if (value.includes("player.vimeo.com")) {
      value = value.replace("player.vimeo.com/video/", "vimeo.com/");
    }

    return value;
  };

  public static youTubeLinkTest = (value: string) => {
    return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(value);
  };

  public static vimeoLinkTest = (value: string) => {
    return (
      /^https?:\/\/(www\.)?vimeo\.com\//.test(value) ||
      /^https?:\/\/player\.vimeo\.com\/video\//.test(value)
    );
  };

  public static convertDateToDays(date: Date): string {
    const now = new Date();
    const diffTime = date?.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays <= 0) return "Expirado";
    if (diffDays > 0 && diffDays < 1) {
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      return `${String(diffHours).padStart(2, "0")} hora(s)`;
    }

    return `${String(Math.ceil(diffDays)).padStart(2, "0")} dias`;
  }

  public static calculateMonthsQuantity = (
    targetDate: Date | string,
  ): string => {
    if (!targetDate) return "Data não fornecida";

    const target =
      targetDate instanceof Date ? targetDate : new Date(targetDate);
    const today = new Date();

    if (!(target instanceof Date) || isNaN(target.getTime())) {
      return "Data Inválida";
    }

    if (target < today) {
      return "Já passou";
    }

    let months = (target.getFullYear() - today.getFullYear()) * 12;
    months += target.getMonth() - today.getMonth();

    if (target.getDate() < today.getDate()) {
      months--;
    }

    if (months === 0) return "Menos de um mês";
    if (months === 1) return "1 mês";
    return `${months} meses`;
  };

  public static formatLargeCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    }
    return HelpersUtils.formatCurrency(value);
  };

  public static countDaysBetweenDates = (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    return differenceInDays;
  };

  public static formatExpirationDays = (endDate?: string): string => {
    if (!endDate) return "";

    const today = new Date();
    const expirationDate = new Date(endDate);
    const timeDiff = expirationDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysRemaining > 0
      ? `${daysRemaining} dia${daysRemaining > 1 ? "s" : ""}`
      : daysRemaining === 0
        ? "Hoje"
        : "Expirado";
  };

  public static validateNumericInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
    allowDecimal = true,
  ): boolean => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "Home",
      "End",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ];

    if (allowDecimal) {
      allowedKeys.push(",", ".");
    }

    if (
      (e.ctrlKey || e.metaKey) &&
      ["a", "c", "v", "x"].includes(e.key.toLowerCase())
    ) {
      return true;
    }

    if (/^\d$/.test(e.key) || allowedKeys.includes(e.key)) {
      return true;
    }

    e.preventDefault();
    return false;
  };
}

export default HelpersUtils;
