import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
export default function Home() {
  return (
    <div className="text-red-500">
      <Alert>
        <AlertTitle>Hello World</AlertTitle>
        <AlertDescription>Hello World</AlertDescription>
      </Alert>
    </div>
  )
}
