export default function ({ store, redirect }) {
  console.log(store);
  if (store.state.auth.user) return redirect('/')
}