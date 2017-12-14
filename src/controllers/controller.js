class Controller {
    constructor(model) {
        this.model = model
        this.projection = {
            __v: false,
            authorisation_version: false
        }
    }

    response(res, statusCode = 200, data = {}, message = null) {
        let status = statusCode >= 200 && statusCode < 400 ? 'success' : 'fail'
        return res.status(statusCode).json({status: status, data: data, error: {message: message}})
    }

    create(req, res, next) {
        this.model.create(req.body)
            .then(doc => this.model.findById(doc._id, this.projection))
            .then(doc => this.response(res, 200, doc))
            .catch(err => {
                next(err)
            })
    }

    find(req, res, next) {
        return this.model.find(req.query, this.projection)
            .then(collection => this.response(res, 200, collection))
            .catch(err => next(err))
    }

    findOne(req, res, next) {
        return this.model.findOne(req.query, this.projection)
            .then(doc => this.response(res, 200, doc))
            .catch(err => next(err))
    }

    findById(req, res, next) {
        return this.model.findById(req.params.id, this.projection)
            .then(doc => {
                if (!doc) {
                    return this.response(res, 404, null, 'Not found')
                }
                return this.response(res, 200, doc)
            })
            .catch(err => next(err));
    }

    update(req, res, next) {
        this.model.update({_id: req.params.id}, req.body)
            .then(results => {
                if (results.n < 1) {
                    return this.response(res, 404, null, 'Not found')
                }
                if (results.nModified < 1) {
                    return this.response(res, 304)
                }
                return this.findById(req, res, next)
            })
            .catch(err => next(err));
    }

    remove(req, res, next) {
        this.model.remove({_id: req.params.id})
            .then(doc => {
                if (!doc) {
                    return this.response(res, 404, null, 'Not found')
                }
                return this.response(res, 204, null)
            })
            .catch(err => next(err))
    }
}

module.exports = Controller
