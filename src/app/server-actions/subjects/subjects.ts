'use server';

import prisma from '@/db';
import { Category } from '@prisma/client';

export async function addSubject({
  name,
  category,
}: {
  name: string;
  category: Category;
}) {
  if (!name || !category) {
    return { error: 'Please fill all the fields' };
  }
  try {
    await prisma.subject.create({
      data: {
        name,
        category,
      },
    });
    return { success: 'Subject added successfully' };
  } catch (error) {
    return { error: 'Error while adding subject.' };
  }
}

export async function getSubject() {
  try {
    const data = await prisma.subject.findMany({});
    return { data: data };
  } catch (error) {
    return { error: 'Failed to fetch subjects' };
  }
}

export async function getSubjectById({ id }: { id: string }) {
  try {
    const data = await prisma.subject.findFirst({ where: { id: id } });
    if (data === null) {
      return { error: 'Subject not found' };
    }
    return { data: data };
  } catch (error) {
    return { error: 'Failed to fetch subjects' };
  }
}

export async function updateSubject({
  id,
  category,
  name,
}: {
  id: string;
  category: Category;
  name: string;
}) {
  if (!id) return { error: 'Please provide the id!' };
  if (!category || !name) return { error: 'Please provide category and name' };

  try {
    await prisma.subject.update({
      where: { id: id },
      data: {
        category: category,
        name: name,
      },
    });
    return { success: 'Subject updated successfully!' };
  } catch (error) {
    return { error: 'Failed to update subject' };
  }
}

export async function deleteSubject({ id }: { id: string }) {
  if (!id) return { error: 'Please provide the id.' };
  try {
    await prisma.subject.delete({ where: { id: id } });
    return {
      success: 'Subject deleted successfully!',
    };
  } catch (error) {
    return {
      error: 'Failed to delete Subject',
    };
  }
}

export async function getSubjectbyCategory({
  category,
}: {
  category: Category;
}) {
  try {
    const data = await prisma.subject.findMany({
      where: { category: category },
    });
    return { data: data };
  } catch (error) {
    return { error: 'Failed to fetch subjects' };
  }
}
