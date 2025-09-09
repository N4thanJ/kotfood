const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

const uploadImage = async (formData: FormData) => {
  return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  });
};

const CloudinaryService = { uploadImage };

export default CloudinaryService;
