const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        status: "Healthy",
        project: "First DevOps Project (Node.js + K8s)",
        message: "Welcome to Node.js App on Kubernetes via Jenkins CI/CD!"
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
