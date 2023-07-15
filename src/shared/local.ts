export const localPipe = (data: any, language?: string): any => {
 // eslint-disable-next-line prefer-const
 switch (language) {
case 'am':
  return data?.am;
case 'en':
  return data?.en;
case 'tg':
  return data?.tg;
case 'or':
  return data?.or;
 }
  
 return null;
  };
  