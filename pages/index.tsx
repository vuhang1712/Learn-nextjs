import type { NextPage } from "next";
import Head from "next/head";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import ItemTodo from "../components/ItemTodo";
import TodoList from "../components/TodoList";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [input, setInput] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(-1);
  const [todoList, setTodoList] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (input && index !== -1) {
      todoList[index] = input.trim();
      localStorage.setItem("todoList", JSON.stringify(todoList));
      setIsEdit(false);
      setInput("");
      setIndex(-1);
    } else if (input) {
      localStorage.setItem(
        "todoList",
        JSON.stringify([...todoList, input.trim()])
      );
      setTodoList([...todoList, input.trim()]);
      setInput("");
    }
  };

  const handleEdit = (index: number) => {
    const value = todoList[index];
    setIsEdit(true);
    setInput(value);
    setIndex(index);
  };

  const handleDelete = (index: number): void => {
    const newTodoList = todoList.filter(
      (todo, _, array) => array.indexOf(todo) !== index
    );
    setTodoList(newTodoList);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputSearch(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main
        className={`${styles.main} flex items-center justify-center mx-auto mt-5 p-5 border border-gray-400 rounded-lg `}
      >
        <h1 className="text-3xl text-gray-500 font-bold mb-3">Todo List</h1>

        <Form onSubmit={handleSubmit} className="flex mb-3">
          <Input
            id="input-todo"
            type="text"
            name="todo"
            value={input}
            onChange={handleChange}
            placeholder="Enter your todo..."
            className="px-3 py-2"
          />
          <Button
            type="submit"
            color="success"
            rounded="md"
            className="text-white py-2 px-5 ml-2"
          >
            {isEdit ? "Save" : "Add"}
          </Button>
        </Form>

        <Form>
          <Input
            id="input-search"
            type="search"
            name="search-todo"
            onChange={useDebouncedCallback(handleSearch, 500)}
            placeholder="Search..."
            className="px-3 py-2"
          />
        </Form>

        <TodoList className="w-full">
          {todoList.length ? (
            todoList.map((value, index) => {
              return (
                value.includes(inputSearch) && (
                  <ItemTodo
                    key={index}
                    className="text-gray-700 bg-gray-100 rounded-lg p-3 my-2"
                  >
                    <span>{value}</span>
                    <div className="flex">
                      <Button
                        type="button"
                        color="success"
                        onClick={() => handleEdit(index)}
                        className="text-white py-2 px-5 mr-2"
                        rounded="3xl"
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        color="error"
                        onClick={() => handleDelete(index)}
                        className="text-white py-2 px-5"
                        rounded="3xl"
                      >
                        Delete
                      </Button>
                    </div>
                  </ItemTodo>
                )
              );
            })
          ) : (
            <p className="text-gray-800">Todo List is empty!</p>
          )}
        </TodoList>
      </main>
    </div>
  );
};

export default Home;
