import React, { useContext, useEffect, useRef, useState } from "react";  
import { Button, Form, Input, Space, Popconfirm, Table, Select } from "antd";
import "./App.css"
import axios from "axios";
import { Link } from "react-router-dom";

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  count,
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing && inputRef) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  
  if (editable) {
    const options = [];
    console.log(count)
    for (let i = 1; i <= count; i++) {
      console.log("Хуй")
      options.push({
        label: i,
        value: i,
      });
    }
    // console.log(options)
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `Поле ${title} необходимо.`,
          },
        ]}
      >
        {dataIndex === 'task' 
        ? <Input ref={inputRef} onBlur={save} placeholder="Введите текст"/>
        : null}
        {dataIndex === 'difficulty'
        ? <Input ref={inputRef} onBlur={save} type="number"/>
        : null}
        {dataIndex === 'priority'
        ? <Select ref={inputRef} onBlur={save} options={[
          {
            value: 5,
            label: 'Very High',
          },
          {
            value: 4,
            label: 'High',
          },
          {
            value: 3,
            label: 'Medium',
          },
          {
            value: 2,
            label: 'Very Low',
          },
          {
            value: 1,
            label: 'Low',
          },
        ]}
      />
        : null}
        {dataIndex === 'position'
        ? <Select ref={inputRef} onBlur={save} options={[
          {
            value: 'frontend',
            label: 'Фронт-энд',
          },
          {
            value: 'backend',
            label: 'Бэк-энд',
          },
          {
            value: 'database',
            label: 'БД',
          },
          {
            value: 'design',
            label: 'Дизайн',
          },
          {
            value: 'mobile',
            label: 'Мобильная разработка',
          },
        ]}
      />
        : null}
        {dataIndex ==='link'
        ? <Select
        ref={inputRef} 
        onBlur={save}
        mode="multiple"
        allowClear
        style={{
          width: '100%',
        }}
        placeholder="Please select"
        value={options.values}
        options={options}
        />
        : null}
        
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};


function FirstPage() {
  const PostRequest = (e) => {
    e.preventDefault()
        axios.post('http://localhost:8080/api/stepone',  {dataSource: dataSource})
          .then(res => {
            console.log(res);
            // Добавьте здесь логику для обработки успешного ответа сервера
          })
          .catch(err => {
            console.error(err);
            // Добавьте здесь обработку ошибок при выполнении запроса
          });
  }

  const [dataSource, setDataSource] = useState([
    {key: 1, id: 1, task: "task1", position: "frontend", difficulty: 1, priority: 2, link:""},
    {key: 2, id: 2, task: "task2", position: "database", difficulty: 3, priority: 5, link:""},
    {key: 3, id: 3, task: "task3", position: "backend", difficulty: 1, priority: 2, link:""},
    {key: 4, id: 4, task: "task4", position: "design", difficulty: 5, priority: 2, link:""},
    {key: 5, id: 5, task: "task5", position: "frontend", difficulty: 5, priority: 1, link:""},
    {key: 6, id: 6, task: "task6", position: "backend", difficulty: 4, priority: 4, link:""},
    {key: 7, id: 7, task: "task7", position: "mobile", difficulty: 1, priority: 1, link:""},
    {key: 8, id: 8, task: "task8", position: "mobile", difficulty: 3, priority: 3, link:""},
    {key: 9, id: 9, task: "task9", position: "database", difficulty: 5, priority: 2, link:""},
    {key: 10, id: 10, task: "task10", position: "frontend", difficulty: 1, priority: 2, link:""},
    {key: 11, id: 11, task: "task11", position: "design", difficulty: 1, priority: 5, link:""},
    {key: 12, id: 12, task: "task12", position: "backend", difficulty: 2, priority: 2, link:""},
    {key: 13, id: 13, task: "task13", position: "database", difficulty: 3, priority: 1, link:""},
    {key: 14, id: 14, task: "task14", position: "frontend", difficulty: 5, priority: 2, link:""},
    {key: 15, id: 15, task: "task15", position: "mobile", difficulty: 1, priority: 3, link:""},
  ]);
  const [count, setCount] = useState(1);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Задача',
      dataIndex: 'task',
      editable: true,
    },
    {
      title: 'Спецификация',
      dataIndex: 'position',
      editable: true,
    },
    {
      title: 'Сложность задачи',
      dataIndex: 'difficulty',
      editable: true,
    },
    {
      title: 'Приоритет',
      dataIndex: 'priority',
      editable: true,
    },
    {
    title: 'Связи между задачами',
      dataIndex: 'link',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'delete',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Точно   удалить?" onConfirm={() => handleDelete(record.key)}>
            <Button>Удалить</Button>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      id: count,
      task: '',
      difficulty: 0,
      priority: 1,
      position: '',
      link: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <div>
        <h2 className="Header">СпринтАссистэнт</h2>
      </div>
      <div>
      <Form
    name="trigger"
    style={{
      display: "flex",
      justifyContent: "center"
    }}
    layout="vertical"
    autoComplete="off"
  >
    <Space direction="horizontal">
      <Form.Item>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
          minWidth: 200,
        }}
      >
        Добавить строку
      </Button>
      </Form.Item>
    <Form.Item>
    <Button 
      type="primary"
      onClick={PostRequest}
      style={{
        marginBottom: 16,
        minWidth: 200,
      }}
    >
      <Link to="/users">
        Далее
      </Link>
    </Button>
    </Form.Item>
    </Space>
  </Form>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      </div>
    </div>
  );
}

export default FirstPage;
