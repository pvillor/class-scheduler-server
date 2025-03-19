export interface Schedule {
  id: string
  studentId: string
  teacherId: string
  scheduledAt: Date
  status: 'pending' | 'canceled' | 'confirmed' | 'finished'
}

export interface CreateSchedule {
  studentId: string
  teacherId: string
  date: string
}
