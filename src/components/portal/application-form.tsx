import { useState } from 'react';
import { Steps, Button, Checkbox, Form, Input } from 'antd';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';

const { Step } = Steps;

interface FormData {
  name: string;
  email: string;
}

const StepOne: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleNext = () => {
    onNext();
  };

  return (
    <>
      <Checkbox
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      >
        I agree to the terms and conditions
      </Checkbox>
      <div style={{ marginTop: '24px' }}>
        <Button type="primary" disabled={!isChecked} onClick={handleNext}>
          Next
        </Button>
      </div>
    </>
  );
};

const StepTwo: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const handleNext = () => {
    onNext();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  return (
    <>
      <Formik
        initialValues={{ name: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleNext}
      >
        {({ errors, touched }) => (
          <FormikForm>
            <Form.Item label="Name" name="name">
              <Field name="name" as={Input} />
              {errors.name && touched.name && (
                <div className="error">{errors.name}</div>
              )}
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Field name="email" as={Input} />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}
            </Form.Item>
            <div style={{ marginTop: '24px' }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </FormikForm>
        )}
      </Formik>
    </>
  );
};

const StepThree: React.FC<{
  data: FormData;
  onSave: () => void;
  onPrev: () => void;
}> = ({ data, onSave, onPrev }) => {
  const handleSave = () => {
    onSave();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <>
      <h2>Preview Application Form</h2>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
      <div style={{ marginTop: '24px' }}>
        <Button type="primary" onClick={handleSave}>
          Save
        </Button>
        <Button style={{ marginLeft: '12px' }} onClick={handlePrev}>
          Previous
        </Button>
      </div>
    </>
  );
};

const ApplicationForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSave = () => {
    // Save the form data
    console.log('Form data saved:', formData);
  };

  const steps = [
    {
      title: 'Agreement',
      content: <StepOne onNext={handleNext} />,
    },
    {
      title: 'Application Form',
      content: (
        <StepTwo
          onNext={handleNext}
          onPrev={handlePrev}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: 'Preview',
      content: (
        <StepThree
          data={formData}
          onSave={handleSave}
          onPrev={handlePrev}
        />
      ),
    },
  ];

  return (
    <div>
      <Steps current={currentStep}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div style={{ marginTop: '24px' }}>{steps[currentStep].content}</div>
    </div>
  );
};

export default ApplicationForm;
