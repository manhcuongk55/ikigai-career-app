// ===== IKIGAI Career Guidance - 39 Questions =====
// 4 Ikigai Pillars: Love=10, Good=10, Need=10, Paid=9

const QUESTIONS = [
  // ===== PILLAR 1: WHAT YOU LOVE (Đam mê) - 10 câu =====
  {
    id: 1,
    text: "Bạn có thường dành thời gian rảnh để tìm hiểu, nghiên cứu một chủ đề nào đó mà không cần ai bắt buộc?",
    pillar: "love", weight: 1.0
  },
  {
    id: 2,
    text: "Khi làm việc bạn yêu thích, bạn có hay quên cả thời gian (trạng thái 'flow')?",
    pillar: "love", weight: 1.0
  },
  {
    id: 3,
    text: "Bạn thích làm việc với con người (giao tiếp, giảng dạy, thuyết trình)?",
    pillar: "love", weight: 1.0, tags: ["social", "communication"]
  },
  {
    id: 4,
    text: "Bạn thích giải quyết các bài toán logic, phân tích dữ liệu, hoặc lập trình?",
    pillar: "love", weight: 1.0, tags: ["analytical", "tech"]
  },
  {
    id: 5,
    text: "Bạn thích sáng tạo — thiết kế, viết lách, vẽ, làm video, hoặc tạo nội dung?",
    pillar: "love", weight: 1.0, tags: ["creative", "design"]
  },
  {
    id: 6,
    text: "Bạn thích xây dựng và vận hành hệ thống, quy trình, tổ chức công việc?",
    pillar: "love", weight: 1.0, tags: ["management", "operations"]
  },
  {
    id: 7,
    text: "Bạn thích nghiên cứu thị trường, tìm hiểu xu hướng, và phát triển chiến lược kinh doanh?",
    pillar: "love", weight: 1.0, tags: ["business", "strategy"]
  },
  {
    id: 8,
    text: "Bạn có đam mê với công nghệ mới (AI, blockchain, IoT, v.v.)?",
    pillar: "love", weight: 1.0, tags: ["tech", "innovation"]
  },
  {
    id: 9,
    text: "Bạn có thích được đi du lịch, khám phá văn hóa mới và làm việc ở nhiều nơi khác nhau?",
    pillar: "love", weight: 1.0, tags: ["global", "freelance"]
  },
  {
    id: 10,
    text: "Bạn có cảm thấy hạnh phúc khi giúp đỡ người khác phát triển bản thân và sự nghiệp?",
    pillar: "love", weight: 1.5, tags: ["coaching", "social-impact", "education"]
  },

  // ===== PILLAR 2: WHAT YOU'RE GOOD AT (Năng lực) - 10 câu =====
  {
    id: 11,
    text: "Khả năng giao tiếp và thuyết phục người khác của bạn?",
    pillar: "good", weight: 1.0, tags: ["communication", "sales"]
  },
  {
    id: 12,
    text: "Khả năng tư duy phân tích, xử lý dữ liệu và giải quyết vấn đề phức tạp?",
    pillar: "good", weight: 1.0, tags: ["analytical", "tech"]
  },
  {
    id: 13,
    text: "Khả năng lãnh đạo, quản lý đội nhóm và phân phối công việc?",
    pillar: "good", weight: 1.0, tags: ["management", "leadership"]
  },
  {
    id: 14,
    text: "Khả năng sáng tạo — tạo ra ý tưởng mới, thiết kế, hoặc storytelling?",
    pillar: "good", weight: 1.0, tags: ["creative", "design"]
  },
  {
    id: 15,
    text: "Khả năng sử dụng công nghệ, phần mềm, và các công cụ digital?",
    pillar: "good", weight: 1.0, tags: ["tech", "digital"]
  },
  {
    id: 16,
    text: "Khả năng ngoại ngữ (tiếng Anh hoặc ngôn ngữ khác)?",
    pillar: "good", weight: 1.0, tags: ["language", "global"]
  },
  {
    id: 17,
    text: "Khả năng quản lý tài chính, lập kế hoạch ngân sách, và tối ưu chi phí?",
    pillar: "good", weight: 1.0, tags: ["finance", "business"]
  },
  {
    id: 18,
    text: "Khả năng tự học, thích nghi nhanh với công nghệ và kiến thức mới?",
    pillar: "good", weight: 1.5, tags: ["learning", "adaptability"]
  },
  {
    id: 19,
    text: "Khả năng làm việc độc lập, tự quản lý thời gian và ưu tiên công việc?",
    pillar: "good", weight: 1.0, tags: ["freelance", "operations"]
  },
  {
    id: 20,
    text: "Khả năng networking — xây dựng và duy trì mối quan hệ chuyên nghiệp?",
    pillar: "good", weight: 1.0, tags: ["network", "business", "social"]
  },

  // ===== PILLAR 3: WHAT THE WORLD NEEDS (Sứ mệnh) - 10 câu =====
  {
    id: 21,
    text: "Bạn quan tâm đến việc giải quyết các vấn đề xã hội (giáo dục, sức khỏe, môi trường)?",
    pillar: "need", weight: 1.0, tags: ["social-impact", "healthcare", "education"]
  },
  {
    id: 22,
    text: "Bạn muốn giúp doanh nghiệp nhỏ và vừa (SME) tăng trưởng và số hoá?",
    pillar: "need", weight: 1.0, tags: ["business", "digital-transform"]
  },
  {
    id: 23,
    text: "Bạn muốn ứng dụng AI/công nghệ để tự động hoá và nâng cao hiệu suất?",
    pillar: "need", weight: 1.5, tags: ["tech", "ai", "automation"]
  },
  {
    id: 24,
    text: "Bạn quan tâm đến việc đào tạo, coaching, và phát triển con người?",
    pillar: "need", weight: 1.0, tags: ["education", "coaching", "hr"]
  },
  {
    id: 25,
    text: "Bạn muốn tạo ra sản phẩm/dịch vụ giúp người tiêu dùng có trải nghiệm tốt hơn?",
    pillar: "need", weight: 1.0, tags: ["product", "ux", "consumer"]
  },
  {
    id: 26,
    text: "Bạn quan tâm đến lĩnh vực tài chính, đầu tư, hoặc fintech?",
    pillar: "need", weight: 1.0, tags: ["finance", "fintech"]
  },
  {
    id: 27,
    text: "Bạn quan tâm đến sức khoẻ, wellness, hoặc lối sống lành mạnh?",
    pillar: "need", weight: 1.0, tags: ["healthcare", "wellness"]
  },
  {
    id: 28,
    text: "Bạn muốn xây dựng thương hiệu cá nhân hoặc giúp người khác xây dựng thương hiệu?",
    pillar: "need", weight: 1.0, tags: ["marketing", "branding", "content"]
  },
  {
    id: 29,
    text: "Bạn muốn đóng góp vào việc bảo vệ môi trường và phát triển bền vững?",
    pillar: "need", weight: 1.0, tags: ["social-impact", "innovation"]
  },
  {
    id: 30,
    text: "Bạn quan tâm đến việc xây dựng cộng đồng và kết nối mọi người?",
    pillar: "need", weight: 1.0, tags: ["social", "community", "coaching"]
  },

  // ===== PILLAR 4: WHAT YOU CAN BE PAID FOR (Giá trị thị trường) - 9 câu =====
  {
    id: 31,
    text: "Bạn đánh giá mức độ sẵn sàng của thị trường trả tiền cho kỹ năng/chuyên môn của bạn?",
    pillar: "paid", weight: 1.0
  },
  {
    id: 32,
    text: "Bạn có kinh nghiệm bán hàng, tư vấn, hoặc cung cấp dịch vụ chuyên nghiệp?",
    pillar: "paid", weight: 1.0, tags: ["sales", "consulting"]
  },
  {
    id: 33,
    text: "Bạn có khả năng tạo ra sản phẩm số (khoá học, ebook, phần mềm, template)?",
    pillar: "paid", weight: 1.0, tags: ["digital-product", "tech"]
  },
  {
    id: 34,
    text: "Bạn có network/quan hệ chuyên nghiệp mạnh trong ngành nào đó?",
    pillar: "paid", weight: 1.0, tags: ["network", "business"]
  },
  {
    id: 35,
    text: "Khả năng freelance hoặc kinh doanh độc lập của bạn?",
    pillar: "paid", weight: 1.0, tags: ["freelance", "entrepreneurship"]
  },
  {
    id: 36,
    text: "Bạn đánh giá khả năng kiếm thu nhập thụ động (passive income) của mình?",
    pillar: "paid", weight: 1.0, tags: ["passive-income", "investment"]
  },
  {
    id: 37,
    text: "Mức độ sẵn sàng đầu tư thời gian và tiền bạc để nâng cao kỹ năng?",
    pillar: "paid", weight: 1.5, tags: ["learning", "investment"]
  },
  {
    id: 38,
    text: "Bạn đánh giá mức thu nhập mong muốn so với mức hiện tại?",
    pillar: "paid", weight: 1.0, tags: ["ambition", "growth"]
  },
  {
    id: 39,
    text: "Bạn có khả năng xây dựng nhiều nguồn thu nhập cùng lúc không?",
    pillar: "paid", weight: 1.0, tags: ["entrepreneurship", "passive-income", "freelance"]
  }
];

// Pillar metadata
const PILLARS = {
  love: {
    name: "What You Love",
    label: "Đam mê",
    icon: "❤️",
    color: "#ff6b6b",
    gradient: "linear-gradient(135deg, #ff6b6b, #ee5a24)",
    description: "Điều bạn yêu thích và đam mê",
    questions: QUESTIONS.filter(q => q.pillar === "love")
  },
  good: {
    name: "What You're Good At",
    label: "Năng lực",
    icon: "⚡",
    color: "#fbbf24",
    gradient: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    description: "Kỹ năng và thế mạnh của bạn",
    questions: QUESTIONS.filter(q => q.pillar === "good")
  },
  need: {
    name: "What The World Needs",
    label: "Sứ mệnh",
    icon: "🌍",
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
    description: "Những gì thế giới cần và bạn muốn đóng góp",
    questions: QUESTIONS.filter(q => q.pillar === "need")
  },
  paid: {
    name: "What You Can Be Paid For",
    label: "Thị trường",
    icon: "💰",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    description: "Giá trị thị trường và khả năng kiếm tiền",
    questions: QUESTIONS.filter(q => q.pillar === "paid")
  }
};
