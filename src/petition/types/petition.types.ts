/* enum */
const PetitionStatuses = {
  new: "Новое",
  inWork: "В работе",
  completed: "Завершено",
  cancelled: "Отменено",
} as const

type TPetitionStatuses = typeof PetitionStatuses[keyof typeof PetitionStatuses]

/* common */
type TPetition = {
  status: TPetitionStatuses,
  description: string,
  subject: string,
}

/* dto */
type TPetitionGetAllQueryDto = {
  start?: string,
  end?: string,
}
type TPetitionCreateDto = Omit<TPetition, "status">
type TPetitionUpdateByIdDto = Partial<TPetition>
type TPetitionUpdateDto = Partial<TPetition>
type TPetitionUpdateQueryDto = Partial<TPetition>
type TPetitionCompleteDto = {
  resolutionText: string
}
type TPetitionCancelDto = {
  cancellationText: string
}

export { PetitionStatuses }
export type {
  TPetition,
  TPetitionStatuses,
  TPetitionCreateDto,
  TPetitionGetAllQueryDto,
  TPetitionUpdateByIdDto,
  TPetitionUpdateDto,
  TPetitionUpdateQueryDto,
  TPetitionCompleteDto,
  TPetitionCancelDto,
}