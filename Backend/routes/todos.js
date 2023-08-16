const express = require('express');
const { body, validationResult } = require('express-validator');
const Todo = require('../models/Todo')
const fetchuser = require('../middlewares/fetchuser');
const router = express.Router();
const onlyadmin_superadmin = require('../middlewares/onlyadmin_superadmin');

// Only admins and superadmins are allowed
router.post('/fetchalltodo', onlyadmin_superadmin, async (req, res) => {
    try {
        const todos = await Todo.find();
        res.send(todos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

// That user, admins and superadmins are allowed
router.get('/fetchusertodos', fetchuser, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.send(todos);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }

})

// Fetch todos by ID
router.post('/fetchtodosbyid/:id', onlyadmin_superadmin, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.params.id });
        if (!todos) {
            return res.status(404).send('Not Found')
        }
        res.send(todos);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

// Only student is allowed
router.post('/addtodo', fetchuser, [
    body('title', 'title must be minimum of 3 characters').isLength({ min: 3 }),
    body('description', 'description must be minimum of 5 characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        // This will throw an error if title or description is not valid
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description } = req.body;
        const todo = new Todo({ title, description, user: req.user.id });
        const savedTodo = await todo.save();
        res.json(savedTodo);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

// That user, admins and superadmins are allowed
router.put('/updatetodo/:id', onlyadmin_superadmin, async (req, res) => {
    const { title, description } = req.body;
    const newNote = {};
    try {
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };

        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).send('Not Found')
        }

        todo = await Todo.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(todo)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

// That user, admins and superadmins are allowed
router.delete('/deletetodo/:id', onlyadmin_superadmin, async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).send('Not Found')
        }
        // Checks if the note User is same as the User of the token
        todo = await Todo.findByIdAndDelete(req.params.id);
        res.json({
            Success: "Todo has been deleted",
            todo: todo
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server error');
    }
})

module.exports = router