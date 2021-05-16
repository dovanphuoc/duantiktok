# ReactJS

## Create a new project

```shell
npx create-react-app
```

---

## How to install libraries

**- NPM:**

```shell
npm install lib-name

# or
npm i lib-name

# or install to dev dependencies
npm i lib-name -D
```

**- Yarn:**

```shell
yarn add lib-name

# or install to dev dependencies
yarn add lib-name -D
```

---

## Folder structure

**- src:** Chứa source code chính của dự án

**- public:** Thư mục gốc của web server (máy chủ web), chứa các file công khai

**- node_modules:** Thư mục chứa toàn bộ thư viện được cài đặt trong dự án.
Để có thể import được thư viện khi viết code thì thư viện đó phải nằm trong node_modules. Thư mục này được sinh ra khi `npm install` hoặc `yarn`

**- package.json:** Quản lý các thư viện được chủ động cài đặt trong dự án

**- yarn.lock, package-lock.json:** Quản lý chi tiết toàn bộ các thư viện có trong dự án
(bao gồm toàn bộ các thư viện phụ thuộc)

---

## Use SCSS
First, install sass package

```bash
npm i sass -D

# or
yarn add sass -D
```

`// App.scss`

```css
.wrapper {
    color: #fff;
    background-color: #333;
}
```

`// App.js`

```jsx
import './App.scss'

function App() {
    return <div className="wrapper">This text is white</div>
}

export default App
```

---

## React route DOM
Command cài đặt
```bash
npm i react-route-dom

# or
yarn add react-route-dom
```

Ví dụ sử dụng:

`// App.js`
```jsx
import React from 'react'

// Nhập các components từ thư viện 'react-route-dom'
import {
    BrowserRouter as Router, // Component wrap tạo ra Routes
    Switch, // Component giúp chỉ render ra 1 Route đầu tiên khớp với path hiện tại
    Route, // Component định nghĩa ra mỗi path
    Link, // Component tạo ra liên kết và xử lý chuyển tới liên kết khi click vào
} from 'react-router-dom'

// Tạo component Home
function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    )
}

// Tạo component About
function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    )
}

// Tạo component Dashboard
function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    )
}

// Tạo component App
function App() {
    // Component <Router> không nhất thiết phải wrap toàn trang
    // Tuy nhiên <Router> cần wrap <Route>, <Link>, <Switch>
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        {/* Sử dụng <Link to="path-to-link"> để tạo thẻ liên kết */}
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>

                <hr />

                {/*
                    Component <Switch> sẽ wrap các <Route>.
                    <Switch> giúp render <Route> đầu tiên khớp với path
                    trên URL của trình duyệt theo thứ tự từ trên xuống dưới
                */}
                <Switch>
                    {/*
                        Thêm exact cho <Route> nếu cần khớp chính xác theo path.
                        Theo mặc định <Route> sẽ ở mode khớp "linh động" hơn. Ví dụ:
                            - /about/abc sẽ khớp với /about hoặc /about/abc
                            - Tất cả các path sẽ khớp với /
                        Nếu thêm exact vào thì:
                            - /about/abc sẽ chỉ khớp với /about/abc
                            - / sẽ chỉ khớp với /
                        Lưu ý: Chỉ cần thêm exact vào những Routes có khả năng bị "khớp" path khác ngoài ý muốn
                   */}
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
```

---

## New structure
**- src/containers:** Thư mục chứa các components xử lý logic nghiệp vụ (bussiness logic)
**- src/components:** Thư mục chứa các components cho phần view
**- src/packages:** Thư mục chứa các thư viện tự viết của dự án