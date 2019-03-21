import db from '../../models'

export default async (obj, { restaurant_id: id }, context) => {
  if (!context.scope.includes('allCategories'))
    throw new Error('Permission denied')

  try {
    let restaurant_id = id

    if (!id) {
      restaurant_id = context.user.id
      if (context.userType !== 'Resto') throw new Error('Permission denied')
    }
    
    let res = (await db.query(
      `
      select d.id, d.name
      from restaurants a join restaurantmenus b
      on a.id = b.restaurant_id
      join menucategories c
      on b.id = c.menu_id
      join categories d
      on c.category_id = d.id
      where a.id = ${restaurant_id}
      group by d.id
    `,
      {
        raw: true
      }
    ))[0]

    console.log(res)
    return res
  } catch (error) {
    throw error
  }
}
