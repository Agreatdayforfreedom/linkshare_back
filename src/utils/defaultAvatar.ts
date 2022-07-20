
// export const aleatoryAvatar = (): string => {
//   const publicIds: Array<string> = [
//     'platon-default_rhwxtt',
//     'borges_default_xd8r9u',
//     'dostoievski_default_higmwy',
//     'poe-default_lncx9g',
//     'nietzsche_default_zdgcg4'
//   ]

  
   
//   return `https://res.cloudinary.com/dxge0fbsg/image/upload/ar_1:1,b_rgb:262c35,bo_0px_solid_rgb:000000,c_fill,g_auto,r_max,w_1000/v1658278491/defaults/${publicIds[Math.floor(Math.random()*publicIds.length)]}.jpg`;
// }

export function suffle(){

  const array: Array<string> = [
    'platon-default_rhwxtt',
    'borges_default_xd8r9u',
    'dostoievski_default_higmwy',
    'poe-default_lncx9g',
    'nietzsche_default_zdgcg4'
  ]

  for (var i = array.length - 1; i > 0; i--) {
    var j    = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  
  return `https://res.cloudinary.com/dxge0fbsg/image/upload/ar_1:1,b_rgb:262c35,bo_0px_solid_rgb:000000,c_fill,g_auto,r_max,w_1000/v1658278491/defaults/${array[0]}.jpg`;
}