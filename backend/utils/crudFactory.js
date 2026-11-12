const { ok, fail } = require("./response");

const crudFactory = (Model, entityName) => {
  return {
    getAll: async (req, res) => {
      try {
        const data = await Model.findAll();
        return ok(res, data);
      } catch (err) {
        return fail(res, err.message, 500);
      }
    },
    getOne: async (req, res) => {
      try {
        const data = await Model.findByPk(req.params.id);
        if (!data) return fail(res, `${entityName} not found`, 404);
        return ok(res, data);
      } catch (err) {
        return fail(res, err.message, 500);
      }
    },
    create: async (req, res) => {
      try {
        const data = await Model.create(req.body);
        return ok(res, data, `${entityName} created`, 201);
      } catch (err) {
        return fail(res, err.message, 400);
      }
    },
    update: async (req, res) => {
      try {
        const data = await Model.findByPk(req.params.id);
        if (!data) return fail(res, `${entityName} not found`, 404);
        await data.update(req.body);
        return ok(res, data, `${entityName} updated`);
      } catch (err) {
        return fail(res, err.message, 400);
      }
    },
    remove: async (req, res) => {
      try {
        const data = await Model.findByPk(req.params.id);
        if (!data) return fail(res, `${entityName} not found`, 404);
        await data.destroy();
        return ok(res, { id: req.params.id }, `${entityName} deleted`);
      } catch (err) {
        return fail(res, err.message, 500);
      }
    },
  };
};

module.exports = crudFactory;