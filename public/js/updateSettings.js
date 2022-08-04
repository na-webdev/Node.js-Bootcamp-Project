// updateData
import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:3000/api/v1/users/update-my-password'
        : 'http://localhost:3000/api/v1/users/update-me';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success')
      showAlert(
        'success',
        `${type[0].toUpperCase() + type.slice(1)} successfully updated!`
      );
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
