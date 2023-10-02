import React, { useContext, useEffect, useRef, useState } from "react";  
import { Button, Form, Input, DatePicker, Space, Popconfirm, Table } from "antd";
import axios from "axios";
import "./App.css"

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
    if (editing) {
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
        ? <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        : <Input ref={inputRef} onPressEnter={save} onBlur={save} type="number"/>}
        
        
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

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataSource);
    axios.post('8080/api/save', dataSource)
      .then(res => {
        console.log(res.data);
        // Добавьте здесь логику для обработки успешного ответа сервера
      })
      .catch(err => {
        console.error(err);
        // Добавьте здесь обработку ошибок при выполнении запроса
      });
  };
  
  const [dataSource, setDataSource] = useState('');
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
      width: '30%',
      editable: true,
    },
    {
      title: 'Длительность',
      dataIndex: 'days',
      editable: true,
    },
    {
      title: 'Важность',
      dataIndex: 'priority',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'delete',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <Button>Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      id: `${count}`,
      task: '',
      days: 0,
      priority: 1,
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
        }}
      >
        Добавить строку
      </Button>
      </Form.Item>
    <Form.Item
      hasFeedback
      label="Люди"
      name="field_a"
      validateTrigger="onBlur"
    >
      <Input type="number" placeholder="Кол-во человек" />
    </Form.Item>
    <Form.Item
      hasFeedback
      label="Дата начала спринта"
      name="field_a"
      validateTrigger="onBlur"
      >
    <DatePicker/>
    </Form.Item>
    <Form.Item>
    <Button 
        type="primary"
        onClick={handleSubmit}
        >
          Составить спринт
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

export default App;
