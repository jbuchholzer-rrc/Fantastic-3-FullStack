/**
 * @author Jack Buchholzer
 * ServiceAdvisoryBanner -- shows transit service alerts
 *
 * Fetches live advisories from the Winnipeg Transit API
 * and displays them as warning banners. Shows up on the
 * home page and can be reused anywhere.
 */

import { useEffect, useState } from "react"
import { AlertTriangle } from "lucide-react"
import { getServiceAdvisories } from "../hooks/useTransit"
import "./ServiceAdvisoryBanner.css"

type Advisory = {
  key: number
  priority: number
  title: string
  body: string
}

function ServiceAdvisoryBanner() {
  const [advisories, setAdvisories] = useState<Advisory[]>([])

  useEffect(() => {
    getServiceAdvisories()
      .then((data) => {
        // the API wraps advisories in a top-level object
        const items = data["service-advisories"] || data.serviceAdvisories || []
        setAdvisories(items.slice(0, 3))
      })
      .catch(() => {
        // if the API is down just show nothing
      })
  }, [])

  if (advisories.length === 0) return null

  return (
    <div>
      {advisories.map((adv) => (
        <div key={adv.key} className="advisory-banner">
          <AlertTriangle size={18} className="advisory-icon" />
          <div>
            <div className="advisory-title">{adv.title}</div>
            <div className="advisory-body">{adv.body}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ServiceAdvisoryBanner
