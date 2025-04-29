import "./App.css";

function App() {
  return (
    <>
      <div className="p-15">
        <h1 className="text-center text-5xl text-red-700 font-bold">
          簡単日記アプリ
        </h1>

        {/* 入力欄 */}
        <div className="border rounded-lg border-gray-200 shadow-sm max-w-md mt-12 m-auto p-5">
          <p className="mb-2">タイトル</p>
          <input
            type="text"
            name="title"
            placeholder="今日のタイトル"
            className="border border-gray-200 rounded-lg mb-5 w-full p-2"
          />
          <p className="mb-2">内容</p>
          <textarea
            name="content"
            placeholder="今日の内容"
            className="border border-gray-200 rounded-lg w-full p-2"
          ></textarea>
          <button className="mt-4 bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition grid mx-auto cursor-pointer">
            保存する
          </button>
        </div>

        {/* 日記一覧 */}
        <div className="container mx-auto mt-12">
          <h2 className="font-bold text-3xl text-center">日記一覧</h2>

          <div className="grid gap-5 mt-5">
            <article className="max-w-3xl mx-auto p-5 border rounded-lg border-gray-200 shadow-sm">
              <p className="mb-2 text-gray-500">2025/04/16</p>
              <p className="mb-4 font-bold text-xl">タイトル例1</p>
              <p>
                ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります
                ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります
                ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります
              </p>
            </article>
            <article className="max-w-3xl mx-auto p-5 border rounded-lg border-gray-200 shadow-sm">
              <p className="mb-2 text-gray-500">2025/04/16</p>
              <p className="mb-4 font-bold text-xl">タイトル例1</p>
              <p>
                ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります
                ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります
                ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります
              </p>
            </article>
            <article className="max-w-3xl mx-auto p-5 border rounded-lg border-gray-200 shadow-sm">
              <p className="mb-2 text-gray-500">2025/04/16</p>
              <p className="mb-4 font-bold text-xl">タイトル例1</p>
              <p>
                ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります
                ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります
                ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります
              </p>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
