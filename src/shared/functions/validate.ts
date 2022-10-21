export default function Verificate(value: any) {
  if (value != null && value != undefined) {
    return value;
  } else {
    return null;
  }
}

export function VerificateDefaultNumber(variable: number, defaultVar = 1) {
  if (variable != null && variable != undefined && variable != defaultVar) {
    return variable;
  } else {
    return defaultVar;
  }
}

export function VerificateMaxNumber(variable: number, defaultVar = 1) {
  if (variable != null && variable != undefined && variable < defaultVar) {
    return variable;
  } else {
    return defaultVar;
  }
}

export function VerificateString(object: string, defaultVar = '') {
  if (object != null && object != undefined && object != '') {
    return object;
  } else {
    return defaultVar;
  }
}

export function VerificateLang(lang: string, defaultLang: string) {
  const preVerificateLang = VerificateString(lang, defaultLang);
  if (preVerificateLang.length > 4) {
    return defaultLang;
  }
  return preVerificateLang;
}
