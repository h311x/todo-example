import {z} from "zod";
import {createTRPCRouter, publicProcedure} from "../trpc";

export const todoRouter = createTRPCRouter({
	getTodoList: publicProcedure.query(({ctx}) => {
		return ctx.prisma.todo.findMany()
	}),
	createTodo: publicProcedure.input(z.object({title: z.string(), description: z.string()})).mutation(({input, ctx}) => {
		return ctx.prisma.todo.create({data: input})
	}),
	deleteTodo: publicProcedure.input(z.object({id: z.string().uuid()})).mutation(({input: {id}, ctx}) => {
		return ctx.prisma.todo.delete({where: {id}})
	}),
	editTodo: publicProcedure.input(z.object({
		id: z.string().uuid(),
		title: z.string().optional(),
		description: z.string().optional()
	})).mutation(({input: {id, ...rest}, ctx}) => {
		return ctx.prisma.todo.update({data: rest, where: {id}})
	})
})