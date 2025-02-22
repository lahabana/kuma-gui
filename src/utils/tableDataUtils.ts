import { PAGE_SIZE_DEFAULT } from '@/consts'
import { TableDataParams, TableItem } from './tableDataUtils.types'

function sortEntities(items: TableItem[]): TableItem[] {
  return [...items].sort((a, b) => (a.name > b.name ? 1 : a.name === b.name ? (a.mesh > b.mesh ? 1 : -1) : -1))
}

const getItems = (response: { total: number; items: TableItem[] }): TableItem[] => {
  if (response.total !== 0 && response.items && response.items.length > 0) {
    return sortEntities(response.items)
  }

  return []
}

function getAPICallFunction({
  getSingleEntity,
  getAllEntities,
  getAllEntitiesFromMesh,
  mesh,
  query,
  size,
  offset,
}: TableDataParams) {
  const params = {
    size,
    offset,
  }

  if (getSingleEntity && query) {
    return getSingleEntity({ mesh, name: query }, params)
  }

  if (!mesh || mesh === 'all') {
    return getAllEntities(params)
  }

  if (getAllEntitiesFromMesh && mesh) {
    return getAllEntitiesFromMesh({ mesh }, params)
  }

  return Promise.resolve()
}

export async function getTableData({
  getSingleEntity,
  getAllEntities,
  getAllEntitiesFromMesh,
  mesh,
  query,
  size = PAGE_SIZE_DEFAULT,
  offset,
}: TableDataParams): Promise<{ data: TableItem[]; next: boolean }> {
  const response = await getAPICallFunction({
    getSingleEntity,
    getAllEntities,
    getAllEntitiesFromMesh,
    mesh,
    query,
    size,
    offset,
  })

  if (!response) {
    return {
      data: [],
      next: false,
    }
  }

  return {
    data: response.items ? getItems(response) : [response],
    next: Boolean(response.next),
  }
}
