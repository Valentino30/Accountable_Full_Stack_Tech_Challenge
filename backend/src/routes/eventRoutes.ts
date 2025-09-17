import { Router } from 'express'
import {
  cancelReservation,
  getEventById,
  getEvents,
  reserveEvent,
} from '../controllers/eventController'

const router = Router()

router.get('/', getEvents)
router.get('/:id', getEventById)
router.post('/:id/reserve', reserveEvent)
router.delete('/:id/reserve', cancelReservation)

export default router
