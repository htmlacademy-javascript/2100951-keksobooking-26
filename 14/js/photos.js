const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const headerInput = document.querySelector('.ad-form-header__input');
const headerPreview = document.querySelector('.ad-form-header__preview img');
const photoInput = document.querySelector('.ad-form__input');
const photoContainer = document.querySelector('.ad-form__photo');

headerInput.addEventListener('change', () => {
  const avatar = headerInput.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => avatarName.endsWith(it));

  if (matches) {
    headerPreview.src = URL.createObjectURL(avatar);
  }
});

photoInput.addEventListener('change', () => {
  const photo = photoInput.files[0];
  const photoName = photo.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => photoName.endsWith(it));

  if (matches) {
    let imgElement = photoContainer.querySelector('img');
    if (!imgElement) {
      imgElement = document.createElement('img');
      imgElement.style.width = '100%';
      imgElement.style.height = '100%';
      imgElement.style.objectFit = 'contain';

      photoContainer.append(imgElement);
    }
    imgElement.src = URL.createObjectURL(photo);
  }

});

export const avatarReset = () => {
  headerPreview.src = './img/muffin-grey.svg';
};

export const photoReset = () => {
  const imgElement = photoContainer.querySelector('img');
  if (imgElement) {
    imgElement.remove();
  }
};

