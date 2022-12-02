

export const fileUpload = async(file) =>{
  if(!file) throw new Error('No hay archivo a subir')
  const cloudUrl = 'https://api.cloudinary.com/v1_1/dkuc5ctm1/upload';
  //body de la petición http
  const formData = new FormData(); //el formdata viene en js
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);
  try {
    const resp = await fetch(cloudUrl, {
      method:'POST',
      body: formData
    });
    if(!resp.ok) throw new Error('No se pudo subir la imagen');
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
}