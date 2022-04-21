export type CourseType= {
    _id: string
    code: string
    name: string
    description: string
    status: number | null
}

export type Course = {
    _id: string
    code: string
    name: string
    modality: string
    price: number
    image: string | null
    vacanciesNumber: number
    status: number | null
    courseType: CourseType
}