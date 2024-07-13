// src/components/Medication/AddMedicationForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMedication } from '../../features/medications/medicationsSlice';
import './AddMedicationForm.css';

const AddMedicationForm = ({ userId }) => {
  const [medication, setMedication] = useState({
    id: userId,
    name: '',
    dosage: '',
    frequency: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedication((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addMedication(medication));
      setMedication({ id: userId, name: '', dosage: '', frequency: '' }); // Clear form after successful submission
    } catch (error) {
      console.error('Failed to add medication:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-medication-form">
      <input
        type="text"
        name="name"
        value={medication.name}
        onChange={handleChange}
        placeholder="Medication Name"
        required
      />
      <input
        type="text"
        name="dosage"
        value={medication.dosage}
        onChange={handleChange}
        placeholder="Dosage"
        required
      />
      <input
        type="text"
        name="frequency"
        value={medication.frequency}
        onChange={handleChange}
        placeholder="Frequency"
        required
      />
      <button type="submit">Add Medication</button>
    </form>
  );
};

export default AddMedicationForm;
