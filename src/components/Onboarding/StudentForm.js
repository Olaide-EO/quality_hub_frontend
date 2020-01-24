import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  FormControl,
  Select,
  InputLabel,
  makeStyles,
  MenuItem,
  TextField,
  Box,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  StyledButton,
  buttonTheme,
  Logo,
} from '../Landing/Landing-styles';
import { chooseUserRole } from '../../state/actions/authenticationActions';
import { countries } from '../../utils/countries';

const NavLogo = styled(Logo)`
  a {
    width: 1.5rem;
    height: 1rem;
  }
`;

export const FormButton = styled(StyledButton)`
  width: 50% !important;
  margin-top: 2em;
`;

export const InfoParagraph = styled.p`
  width: 85%;
  text-align: center;
  padding-bottom: 0.8em;
`;

const StudentCardContainer = styled.div`
  max-width: 100%;
  margin: 2rem 0;

  .student-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50rem;
    background: #fff;
    box-shadow: 0 6px 8px #d3d3d3;
    padding: 1rem;
    border-radius: 6px;

    h1 {
      margin: 0;
    }

    .submit-button {
      margin: 1.5rem 0 1rem 0;
    }
  }
`;

const useStyles = makeStyles(theme => ({
  progress: {
    transition: 'width 2s',
  },
  formControl: {
    width: 600,
  },
  textField: {
    width: 600,
    marginTop: '0.6em',
    marginBottom: '0.3em',
  },
  box: {
    '& > *': {
      marginTop: '0.3em',
      marginBottom: '0.3em',
    },
  },
}));

const StudentForm = props => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState({
    userLocation: '',
    experience: '',
    confidence: '',
    github: '',
    linkedin: '',
  });
  return (
    <StudentCardContainer className='student-card-container'>
      <div className='student-card'>
        <Link to='/userrole'>
          <NavLogo />
        </Link>
        <h1>Get started</h1>
        <InfoParagraph>
          Get started by letting us know where you're based, and your
          background in coding. We'll use this information to make
          sure you end up matched with the coach you need.
        </InfoParagraph>
        <div>
          <Box
            className={classes.box}
            display='flex'
            flexDirection='column'
            justifyContent='space-evenly'
            alignItems='center'
          >
            <FormControl required className={classes.formControl}>
              <Autocomplete
                name='location'
                options={countries}
                getOptionLabel={option => option.name}
                onChange={event =>
                  setFormValues({
                    ...formValues,
                    userLocation: event.target.innerText,
                  })
                }
                renderInput={params => (
                  <TextField
                    required
                    name='location'
                    {...params}
                    label='Select your location'
                    fullWidth
                  />
                )}
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <InputLabel>Experience</InputLabel>
              <Select
                placeholder='experience'
                name='experience'
                onChange={event =>
                  setFormValues({
                    ...formValues,
                    experience: event.target.value,
                  })
                }
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>
                  I've taken some online courses
                </MenuItem>
                <MenuItem value={2}>
                  I've completed a number of tutorials and built some
                  personal projects
                </MenuItem>
                <MenuItem value={3}>
                  I've completed a coding bootcamp or similar program
                </MenuItem>
                <MenuItem value={4}>
                  I've completed a CS undergraduate degree
                </MenuItem>
                <MenuItem value={5}>
                  I'm a professional software developer
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl required className={classes.formControl}>
              <InputLabel>Confidence</InputLabel>
              <Select
                onChange={event =>
                  setFormValues({
                    ...formValues,
                    confidence: event.target.value,
                  })
                }
              >
                <MenuItem value={1}>
                  I'm not very confident in my ability to interview
                  successfully
                </MenuItem>
                <MenuItem value={2}>
                  I'm not as confident at interviewing as I'd like to
                  be
                </MenuItem>
                <MenuItem value={3}>
                  I'm not confident, but not unconfident either
                </MenuItem>
                <MenuItem value={4}>
                  I'm pretty confident in my interview ability
                </MenuItem>
                <MenuItem value={5}>
                  I'm completely confident at interviewing
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                onChange={event =>
                  setFormValues({
                    ...formValues,
                    github: event.target.value,
                  })
                }
                placeholder='Link to your GitHub profile (optional)'
                className={classes.textField}
              />
            </FormControl>
            <FormControl>
              <TextField
                onChange={event =>
                  setFormValues({
                    ...formValues,
                    linkedin: event.target.value,
                  })
                }
                placeholder='Link to your LinkedIn profile (optional)'
                className={classes.textField}
              />
            </FormControl>
            <FormButton
              className='submit-button'
              theme={buttonTheme}
              onClick={() =>
                props.chooseUserRole(props, formValues, 1)
              }
            >
              Submit
            </FormButton>
          </Box>
        </div>
      </div>
    </StudentCardContainer>
  );
};

export default connect(state => state, { chooseUserRole })(
  StudentForm,
);