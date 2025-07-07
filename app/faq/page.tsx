"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, ArrowLeft, HelpCircle, Sparkles } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useRef } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "How does Splash token creation work?",
    answer:
      "Splash uses advanced blockchain technology to deploy your custom tokens instantly. Simply connect your wallet, choose your token parameters (name, symbol, supply), and our smart contracts handle the rest. Your token is deployed on the blockchain within seconds and becomes immediately tradeable.",
  },
  {
    question: "What are the fees for creating a token?",
    answer:
      "Token creation fees vary based on network congestion and blockchain gas prices. Typically, you'll pay a small deployment fee (usually 0.1-0.5 SOL) plus network transaction fees. All fees are transparently displayed before you confirm the transaction.",
  },
  {
    question: "Can I customize my token after creation?",
    answer:
      "Once deployed, certain token properties like total supply and contract address cannot be changed. However, if you retain mint authority, you can mint additional tokens. We recommend carefully reviewing all parameters before deployment.",
  },
  {
    question: "How do I add liquidity to my token?",
    answer:
      "After creating your token, you can add liquidity on decentralized exchanges like Raydium or Orca. You'll need to pair your token with SOL or USDC. We provide direct links to popular DEXs to make this process seamless.",
  },
  {
    question: "Is my token automatically listed on exchanges?",
    answer:
      "Your token is immediately available on decentralized exchanges once liquidity is added. For centralized exchange listings, you'll need to apply separately to each exchange. Popular DEXs like Jupiter will automatically index your token once it has sufficient liquidity.",
  },
  {
    question: "What wallet do I need to use Splash?",
    answer:
      "Splash supports all major Solana wallets including Phantom, Solflare, Backpack, and WalletConnect-compatible wallets. Make sure you have enough SOL in your wallet to cover deployment and transaction fees.",
  },
  {
    question: "Can I create multiple tokens with one wallet?",
    answer:
      "Yes! There's no limit to how many tokens you can create with a single wallet. Each token deployment is a separate transaction, so you'll pay fees for each one. All your created tokens will be associated with your wallet address.",
  },
  {
    question: "What happens if the transaction fails?",
    answer:
      "If a token creation transaction fails, you'll only pay the network gas fees, not the full deployment cost. Common reasons for failure include insufficient funds, network congestion, or invalid token parameters. You can retry the transaction after fixing any issues.",
  },
  {
    question: "How do I verify my token is legitimate?",
    answer:
      "All tokens created through Splash are automatically verified on blockchain explorers. You can view your token's contract address, transaction history, and metadata on Solscan or SolanaFM. We also provide direct links to these explorers from your success page.",
  },
  {
    question: "Can I burn or destroy my tokens?",
    answer:
      "Yes, if you retain the necessary authorities, you can burn tokens to reduce the total supply. This is an irreversible action. You can also revoke mint authority to prevent future token creation, making your token's supply permanently fixed.",
  },
]

interface FAQPageProps {
  onBack: () => void
}

const FloatingParticle = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="absolute w-1 h-1 bg-green-400 rounded-full opacity-30"
    initial={{
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 10,
      opacity: 0,
    }}
    animate={{
      y: -10,
      opacity: [0, 0.6, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  />
)

const FAQItem = ({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  index: number
  isOpen: boolean
  onToggle: () => void
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
          : {}
      }
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <Card className="bg-gray-950 border border-gray-800 hover:border-green-400/50 transition-all duration-300 rounded-xl overflow-hidden backdrop-blur-sm">
        <motion.button
          onClick={onToggle}
          className="w-full p-6 text-left flex items-center justify-between group"
          whileHover={{ backgroundColor: "rgba(17, 24, 39, 0.8)" }}
          whileTap={{ scale: 0.995 }}
        >
          <motion.h3
            className="text-lg font-semibold text-white pr-4 group-hover:text-green-400 transition-colors duration-300"
            layout
          >
            {item.question}
          </motion.h3>
          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
              scale: isOpen ? 1.1 : 1,
              color: isOpen ? "#4ade80" : "#10b981",
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.2 }}
          >
            <ChevronDown className="w-5 h-5 flex-shrink-0" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
                y: -20,
              }}
              animate={{
                height: "auto",
                opacity: 1,
                y: 0,
              }}
              exit={{
                height: 0,
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
              className="overflow-hidden"
            >
              <motion.div
                className="px-6 pb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.div
                  className="border-t border-gray-800 pt-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  style={{ originX: 0 }}
                >
                  <motion.p
                    className="text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    {item.answer}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

export default function FAQPage({ onBack }: FAQPageProps) {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <motion.div
      className="min-h-screen bg-black text-white p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle key={i} delay={i * 0.5} />
      ))}

      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #10b981 0%, transparent 50%)",
            "radial-gradient(circle at 40% 50%, #10b981 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <HelpCircle className="w-8 h-8 text-green-400" />
            </motion.div>
            <motion.h1
              className="text-4xl font-bold text-green-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <Sparkles className="w-6 h-6 text-green-400" />
            </motion.div>
          </motion.div>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Everything you need to know about creating and managing tokens with Splash
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openItems.includes(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
      </div>
    </motion.div>
  )
}
