

import * as React from 'react'

import {
    getEmployees
  } from './helpers'
  import { Employee } from './index'
  
  export enum Status {
    Loading,
    Ready,
    Updating,
    Error,
  }
  
  export const useEmployees = () => {
    const [employees, setEmployees] = React.useState<Employee[]>([])

    const [status, setStatus] = React.useState(Status.Loading)
    React.useEffect(() => {
        const controller = new AbortController()
        const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjE5MDIyNzVmYzE3MmMwOGNiZGQxMyIsImlhdCI6MTY1MDU2MTA1OCwiZXhwIjoxNjUwNjQ3NDU4fQ.Ks4lgYdBgQ1D0toSaeghi1baqAgODfiiY2zaCUYnHxk"
        // obtiene los newsletters del sitio
        getEmployees(token)
          .then((allEmployees) => {
            setEmployees([...allEmployees])
            setStatus(Status.Ready)
          })
          .catch(() => {
            setStatus(Status.Error)
          })

        return () => {
          // aborta cualquier fetch al desmontar el componente
          controller.abort()
        }
      }, [])

      return {
        employees,
        status,
      }
  }