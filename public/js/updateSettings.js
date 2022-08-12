// updateData
import axios from 'axios';
import { showAlert } from './alert';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/update-my-password'
        : '/api/v1/users/update-me';
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
