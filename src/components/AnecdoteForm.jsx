import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotification } from '../useNotification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  }})

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
      
    if (content.length < 5) {
      setNotification('Anecdote must be at least 5 characters long.')
      return
    }

    event.target.anecdote.value = ''
    setNotification(`You added a new anecdote: "${content}"`)
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
