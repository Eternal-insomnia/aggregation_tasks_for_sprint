import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Space, Popconfirm, Table, Select } from "antd";
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
        {dataIndex === 'user' 
        ? <Input ref={inputRef} onBlur={save} placeholder="Введите текст"/>
        : null}
        {dataIndex === 'position'
        ? <Select ref={inputRef} onBlur={save} options={[
          {
            value: 'UI',
            label: 'UI/UX Разработчик',
          },
          {
            value: 'backend',
            label: 'Бэк-энд разработчик',
          },
          {
            value: 'DB',
            label: 'Специалист по БД',
          },
          {
            value: 'design',
            label: 'Дизайнер',
          },
          {
            value: 'mobile',
            label: 'Андроид/IOS разработчик',
          },
        ]}
      />
        : null}
        {dataIndex === 'grade'
        ? <Select ref={inputRef} onBlur={save} options={[
          {
            value: 'junior',
            label: 'Джуниор',
          },
          {
            value: 'middle',
            label: 'Мидл',
          },
          {
            value: 'senior',
            label: 'Сеньор',
          },
        ]}
      />
        : null}
        {dataIndex === 'email'
        ? <Input type="email" ref={inputRef} onBlur={save} placeholder="Введите текст"/>
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

const SecondPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/save', {dataSource: dataSource})
          .then(res => {
            console.log(res);
            // Добавьте здесь логику для обработки успешного ответа сервера
          })
          .catch(err => {
            console.error(err);
            // Добавьте здесь обработку ошибок при выполнении запроса
          });
      };
    const [dataSource, setdataSource] = useState([
      {id: 1, key: 1, user: "Вася", position: "UI", grade: "junior", email: ""},
      {id: 2, key: 2, user: "Петя", position: "backend", grade: "middle", email: ""},
      {id: 3, key: 3, user: "Коля", position: "designer", grade: "junior", email: ""},
      {id: 4, key: 4, user: "Оля", position: "mobile", grade: "senior", email: ""},
      {id: 5, key: 5, user: "Валя", position: "DB", grade: "junior", email: ""},
    ]);
  const [count, setCount] = useState(1);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setdataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Сотрудник',
      dataIndex: 'user',
      editable: true,
    },
    {
      title: 'Специализация',
      dataIndex: 'position',
      editable: true,
    },
    {
      title: 'Степень',
      dataIndex: 'grade',
      editable: true,
    },
    {
        title: 'Почта',
        dataIndex: 'email',
        editable: true,
      },
    {
      title: '',
      dataIndex: 'delete',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Точно удалить?" onConfirm={() => handleDelete(record.key)}>
            <Button>Удалить</Button>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      id: count,
      user: "",
      position: "",
      grade:"",
      email:"",
    };
    setdataSource([...dataSource, newData]);
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
    setdataSource(newData);
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
    return(
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
        onClick={handleSubmit}
        style={{
          marginBottom: 16,
          minWidth: 200,
        }}
        >
        <Link to="/final">Составить спринт</Link>
          
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
export default SecondPage;