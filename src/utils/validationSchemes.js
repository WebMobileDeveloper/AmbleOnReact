import * as Yup from 'yup';

export const CreateTourSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(90, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Required'),
});
