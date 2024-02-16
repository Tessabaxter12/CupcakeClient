import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllCupcakes = () => {
    return axios(`${apiUrl}/cupcakes`)
}

// // CREATE -> Add a Cupcake
// export const createCupcake = (user, newCupcake) => {
//     return axios({
//         url: `${apiUrl}/cupcakes`,
//         method: 'POST',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: { pet: newCupcake }
//     })
// }

// // UPDATE -> Adjust a Cupcake
// export const updateCupcake = (user, updatedCupcake) => {
//     return axios({
//         url: `${apiUrl}/pets/${updatedCupcake._id}`,
//         method: 'PATCH',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: { cupcake: updatedCupcake }
//     })
// }

// // DELETE -> Delete a Cupcake
// export const removeCupcake = (user, id) => {
//     return axios({
//         url: `${apiUrl}/cupcakes/${id}`,
//         method: 'DELETE',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         }
//     })
// }