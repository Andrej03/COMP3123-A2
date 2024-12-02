const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// Create a new employee
router.post('/', async (req, res) => {
  const { name, position, department, salary } = req.body;
  try {
    const newEmployee = new Employee({ name, position, department, salary });
    const employee = await newEmployee.save();
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update employee by ID
router.put('/:id', async (req, res) => {
  const { first_name, last_name } = req.body;
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    employee.id = req.params.id;
    employee.first_name = first_name;
    employee.last_name = last_name;
    employee = await employee.save();
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    await employee.remove();
    res.json({ msg: 'Employee removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

