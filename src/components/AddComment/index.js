import React from 'react'
import { Box, Grid, Paper, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useForm } from 'react-hook-form'
import { postAPI } from '../../lib/restfullAPI'
import { getCookie } from '../../lib/cookie'

const AddComment = ({photo_id, onAddComment}) => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            const commentData = {
                user_id: getCookie('userId'), // Assuming you have a function to get the user ID from cookies
                comment: data.content,
                photo_id: photo_id
            }
            const comment = await postAPI('comment', commentData);
            onAddComment(photo_id, comment); 
            console.log("Comment added successfully:", comment);
            reset(); // Reset form after successful submission
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={11}>
                    <input
                        {...register('content', { required: true })}
                        placeholder="Enter your comment"
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                </Grid>
                <Grid item xs={1}>
                    <IconButton type="submit" color="primary" aria-label="send comment" sx={{ '&:hover': { color: 'secondary.main' } }}>
                        <SendIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </form>
  )
}

export default AddComment