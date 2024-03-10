import Login from "./Components/Login/Login"
import pb from "./lib/pocketbase"


type Props = {}

export default function Auth({}: Props) {
  return (
    <>
      <h1>Logged in: {pb.authStore.isValid && pb?.authStore?.model?.email}</h1>

     <Login/>
    </>
  )
}