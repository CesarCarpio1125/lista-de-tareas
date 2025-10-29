import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import TaskCard from '@/Pages/Tasks/views/TaskCard.vue';
import { createTestingPinia } from '@pinia/testing';
import { Inertia } from '@inertiajs/inertia';

// Mock Inertia
vi.mock('@inertiajs/inertia');

// Mock the route function
const mockRoute = (name) => `/tasks/${name}`;

const createWrapper = (props = {}) => {
  return mount(TaskCard, {
    props: {
      task: {
        id: 1,
        title: 'Test Task',
        description: 'This is a test task',
        completed: false,
        due_date: '2023-12-31',
        priority: 'high',
        tags: ['test', 'important'],
        ...props.task
      },
      ...props
    },
    global: {
      mocks: {
        $inertia: {
          delete: vi.fn(),
          get: vi.fn()
        },
        route: mockRoute
      },
      stubs: {
        Link: {
          template: '<a :href="to"><slot></slot></a>',
          props: ['to', 'class']
        }
      },
      plugins: [createTestingPinia()]
    }
  });
};

describe('TaskCard.vue', () => {
  it('renders task title and description', () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain('Test Task');
    expect(wrapper.text()).toContain('This is a test task');
  });

  it('shows completed status when task is completed', async () => {
    const wrapper = createWrapper({
      task: { completed: true }
    });
    expect(wrapper.find('.text-green-500').exists()).toBe(true);
    expect(wrapper.text()).toContain('Completada');
  });

  it('shows pending status when task is not completed', () => {
    const wrapper = createWrapper({
      task: { completed: false }
    });
    expect(wrapper.find('.text-amber-500').exists()).toBe(true);
    expect(wrapper.text()).toContain('Pendiente');
  });

  it('emits toggleComplete event when complete button is clicked', async () => {
    const wrapper = createWrapper();
    await wrapper.find('button:first-child').trigger('click');
    expect(wrapper.emitted('toggleComplete')).toBeTruthy();
  });

  it('calls Inertia.delete when delete button is clicked', async () => {
    const wrapper = createWrapper();
    const deleteButton = wrapper.findAll('button').at(2);
    await deleteButton.trigger('click');
    expect(Inertia.delete).toHaveBeenCalledWith('/tasks/1');
  });

  it('displays tags correctly', () => {
    const wrapper = createWrapper({
      task: {
        tags: ['urgent', 'important']
      }
    });
    expect(wrapper.text()).toContain('urgent');
    expect(wrapper.text()).toContain('important');
  });

  it('formats the due date correctly', () => {
    const wrapper = createWrapper({
      task: {
        due_date: '2023-12-31'
      }
    });
    expect(wrapper.text()).toContain('31 de dic. de 2023');
  });

  it('applies correct priority class', () => {
    const wrapper = createWrapper({
      task: {
        priority: 'high'
      }
    });
    expect(wrapper.find('.bg-red-100').exists()).toBe(true);
  });
});
