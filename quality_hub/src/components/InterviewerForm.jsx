import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withFormik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import { StyledButton, buttonTheme, invertTheme } from './Landing';
import { GreyBackgroundContainer, FormCard, FormContainer } from './LoginForm';

import { register } from '../state/actions/actionCreators';

const RegisterCard = styled(FormCard)`
  width: 30em;
  height: 35em;
  font-family: ABeeZee;

  h1 {
    font-size: 24px;
  }
`;

const ThisGreyBackgroundContainer = styled(GreyBackgroundContainer)`
  font-family: ABeeZee;
`;

function InterviewerForm(props) {
  return (
    <ThisGreyBackgroundContainer>
      <RegisterCard>
        <h1> Interviewer Form </h1>
        <FormContainer>
          <Form>
            <Field type="text" name="city" placeholder=" current city " />
            <Field
              type="text"
              name="level_of_experience"
              placeholder=" select level of experience "
            />
            <Field
              type="text"
              name="skills"
              placeholder=" what skill(s) do you have ? "
            />
            <Field
              type="text"
              name="value"
              placeholder=" what value do you bring to dev coach ? "
            />
            <StyledButton theme={buttonTheme}> Submit </StyledButton>
          </Form>
        </FormContainer>
      </RegisterCard>
    </ThisGreyBackgroundContainer>
  );
}

const FormikInterviewerForm = withFormik({
  validationSchema: Yup.object().shape({
    city: Yup.array(),
    level_of_experience: Yup.array(),
    skills: Yup.array(),
    value: Yup.string().required()
  }),
  mapPropsToValues: props => ({
    city: ['edinburgh', 'lagos', 'watford'],
    level_of_experience: ['less than a year', 'Over two years'],
    skills: ['Native JS', 'React JS', 'Node JS'],
    value: ''
  }),
  handleSubmit(values, { props }) {
    props.register('http://localhost:5000/user/register', props, values);
  }
})(InterviewerForm);

export default connect(state => state, { register })(FormikInterviewerForm);