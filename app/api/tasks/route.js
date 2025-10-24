import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// Initialize Google Tasks API
const tasks = google.tasks('v1');

// Helper function to get authenticated client
async function getAuthenticatedClient() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  // In a real application, you'd store and retrieve the access token
  // For now, we'll use the API key approach
  auth.setCredentials({
    access_token: process.env.GOOGLE_ACCESS_TOKEN,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return auth;
}

// GET - Fetch tasks
export async function GET(request) {
  try {
    const auth = await getAuthenticatedClient();
    
    const response = await tasks.tasks.list({
      auth,
      tasklist: '@default', // Use default task list
    });

    return NextResponse.json({
      success: true,
      tasks: response.data.items || [],
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch tasks',
      message: error.message,
    }, { status: 500 });
  }
}

// POST - Create a new task
export async function POST(request) {
  try {
    const { title, notes, due } = await request.json();
    const auth = await getAuthenticatedClient();

    const task = {
      title,
      notes,
      due: due ? new Date(due).toISOString() : undefined,
    };

    const response = await tasks.tasks.insert({
      auth,
      tasklist: '@default',
      resource: task,
    });

    return NextResponse.json({
      success: true,
      task: response.data,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create task',
      message: error.message,
    }, { status: 500 });
  }
}

// PUT - Update a task
export async function PUT(request) {
  try {
    const { taskId, title, notes, due, status } = await request.json();
    const auth = await getAuthenticatedClient();

    const task = {
      title,
      notes,
      due: due ? new Date(due).toISOString() : undefined,
      status: status || 'needsAction',
    };

    const response = await tasks.tasks.update({
      auth,
      tasklist: '@default',
      task: taskId,
      resource: task,
    });

    return NextResponse.json({
      success: true,
      task: response.data,
    });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update task',
      message: error.message,
    }, { status: 500 });
  }
}

// DELETE - Delete a task
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');
    
    if (!taskId) {
      return NextResponse.json({
        success: false,
        error: 'Task ID is required',
      }, { status: 400 });
    }

    const auth = await getAuthenticatedClient();

    await tasks.tasks.delete({
      auth,
      tasklist: '@default',
      task: taskId,
    });

    return NextResponse.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete task',
      message: error.message,
    }, { status: 500 });
  }
}
